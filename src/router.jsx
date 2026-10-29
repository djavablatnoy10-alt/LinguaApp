import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const Ctx = createContext({ path: '/', go: () => {}, params: {} });

function currentLocation() {
  return {
    path: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    const onPopState = () => setLocation(currentLocation());
    const onClick = (event) => {
      const anchor = event.target.closest('a[href]');
      if (
        !anchor || anchor.target || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey || event.button !== 0
      ) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      window.history.pushState({}, '', url.pathname + url.search + url.hash);
      setLocation(currentLocation());
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const go = useCallback((to, replace = false) => {
    const url = new URL(to, window.location.href);
    window.history[replace ? 'replaceState' : 'pushState'](
      {}, '', url.pathname + url.search + url.hash,
    );
    setLocation(currentLocation());
  }, []);

  return <Ctx.Provider value={{ ...location, go, params: {} }}>{children}</Ctx.Provider>;
}

export function Link({ to, children, ...props }) {
  return <a href={to} {...props}>{children}</a>;
}

export function NavLink({ to, end = false, className = '', children, ...props }) {
  const { path } = useContext(Ctx);
  const active = end ? path === to : path === to || path.startsWith(to + '/');
  return (
    <Link
      to={to}
      className={typeof className === 'function' ? className({ isActive: active }) : className}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {typeof children === 'function' ? children({ isActive: active }) : children}
    </Link>
  );
}

export function useNavigate() {
  return useContext(Ctx).go;
}

export function useParams() {
  return useContext(Ctx).params;
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();
  useEffect(() => navigate(to, replace), [to, replace, navigate]);
  return null;
}

export function Route() {
  return null;
}

export function Routes({ children }) {
  const { path, search, hash, go } = useContext(Ctx);
  let chosen = null;
  let params = {};

  for (const child of React.Children.toArray(children)) {
    const pattern = child.props.path;
    if (pattern === '*') {
      chosen ??= child;
      continue;
    }

    const names = [];
    const expression = new RegExp('^' + pattern.split('/').map((part) => (
      part.startsWith(':')
        ? (names.push(part.slice(1)), '([^/]+)')
        : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    )).join('/') + '/?$');
    const match = path.match(expression);
    if (match) {
      params = Object.fromEntries(names.map((name, index) => [name, decodeURIComponent(match[index + 1])]));
      chosen = child;
      break;
    }
  }

  if (!chosen) return null;
  return (
    <Ctx.Provider value={{ path, search, hash, go, params }}>
      {chosen.props.element}
    </Ctx.Provider>
  );
}

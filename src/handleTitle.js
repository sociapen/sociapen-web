import React from 'react';

export default function useDocumentTitle(title = String, prevailOnUnmount = false) {
  const defaultTitle = React.useRef(document.title);

  React.useEffect(() => {
    document.title = title;
  }, [title]);

  React.useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
    // eslint-disable-next-line
  }, []);
}
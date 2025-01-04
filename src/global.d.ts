declare module '*.css' {
  const styles: {
    [className: string]: string;
  };

  export = styles;
}

declare module '*.sass' {
  const styles: {
    [className: string]: string;
  };

  export = styles;
}

declare module '*.scss' {
  const styles: {
    [className: string]: string;
  };

  export = styles;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.svg';

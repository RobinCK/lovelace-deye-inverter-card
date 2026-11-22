export type ScrollUnlock = () => void;

interface LockedStyle {
  readonly element: HTMLElement;
  readonly overflow: string;
  readonly scrollbarGutter: string;
}

const SCROLLABLE_OVERFLOW = new Set(['auto', 'scroll', 'overlay']);

export function lockScroll(origin: Element): ScrollUnlock {
  const locked = scrollContainers(origin).map(lockElement);

  return (): void => {
    locked.forEach(restoreElement);
  };
}

function scrollContainers(origin: Element): HTMLElement[] {
  const containers = new Set<HTMLElement>();
  const root = document.scrollingElement;

  if (root instanceof HTMLElement) {
    containers.add(root);
  }

  for (let node = flatParent(origin); node; node = flatParent(node)) {
    if (node instanceof HTMLElement && isScrollable(node)) {
      containers.add(node);
    }
  }

  return [...containers];
}

function flatParent(node: Node): Node | null {
  if (node instanceof Element && node.assignedSlot) {
    return node.assignedSlot;
  }

  if (node.parentNode instanceof ShadowRoot) {
    return node.parentNode.host;
  }

  return node.parentNode;
}

function isScrollable(element: HTMLElement): boolean {
  if (element.scrollHeight <= element.clientHeight) {
    return false;
  }

  return SCROLLABLE_OVERFLOW.has(getComputedStyle(element).overflowY);
}

function lockElement(element: HTMLElement): LockedStyle {
  const locked: LockedStyle = {
    element,
    overflow: element.style.overflow,
    scrollbarGutter: element.style.getPropertyValue('scrollbar-gutter'),
  };

  if (scrollbarWidth(element) > 0) {
    element.style.setProperty('scrollbar-gutter', 'stable');
  }

  element.style.overflow = 'hidden';

  return locked;
}

function scrollbarWidth(element: HTMLElement): number {
  if (element === document.scrollingElement) {
    return window.innerWidth - element.clientWidth;
  }

  const style = getComputedStyle(element);
  const borders = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

  return element.offsetWidth - element.clientWidth - borders;
}

function restoreElement(locked: LockedStyle): void {
  locked.element.style.overflow = locked.overflow;
  locked.element.style.setProperty('scrollbar-gutter', locked.scrollbarGutter);
}

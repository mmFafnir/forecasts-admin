interface IPos {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export const getScrollPos = (target: HTMLElement): IPos => {
  if (!target.parentElement) console.log("Нет родителя");
  const top = target.offsetTop;
  const bottom =
    target.parentElement!.offsetHeight - target.offsetHeight - target.offsetTop;
  const left = target.offsetLeft;
  const right =
    target.parentElement!.offsetWidth - target.offsetWidth - target.offsetLeft;

  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
  };
};

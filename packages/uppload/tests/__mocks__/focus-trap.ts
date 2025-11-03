export type FocusTrap = {
  activate: () => void;
  deactivate: () => void;
};

export const createFocusTrap = (): FocusTrap => ({
  activate: () => {},
  deactivate: () => {},
});

'use client';

import { X } from 'lucide-react';
import { forwardRef, ReactNode } from 'react';

interface ModalProps {
  id: string;                    // unique id for the dialog
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
};

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ id, title, children, size = 'md' }, ref) => {
    return (
      <dialog id={id} className="modal" ref={ref}>
        {/* Modal content */}
        <div className={`modal-box ${sizeClasses[size]} rounded-xl shadow-2xl`}>
          {title && (
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-base-300">
              <h3 className="font-bold text-xl uppercase tracking-tight">
                {title}
              </h3>
              <form method="dialog">
                <button className="btn btn-ghost btn-sm btn-circle">
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          <div className={title ? '' : 'mt-2'}>{children}</div>
        </div>

        {/* Click outside / backdrop to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
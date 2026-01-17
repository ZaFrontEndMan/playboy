'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import Modal from './Modal'; // ← the native dialog Modal we created earlier
import Image from 'next/image';

interface ImageModalProps {
  id: string;                    // required for dialog id
  imageUrl: string;
  alt?: string;
}

const ImageModal = forwardRef<HTMLDialogElement, ImageModalProps>(
  ({ id, imageUrl, alt = 'Product image' }, ref) => {
    return (
      <Modal id={id} ref={ref} size="xl" title="Image Preview">
        <div
          className="relative w-full h-[70vh] rounded-lg overflow-hidden"
          style={{ backgroundColor: 'var(--admin-hover-bg)' }}
        >
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </div>
      </Modal>
    );
  }
);

ImageModal.displayName = 'ImageModal';

export default ImageModal;
import { AppActionTypes, IDispatch } from '@merninator/types';
import React, { ReactNode } from 'react';

interface ModalSkeletonProps {
  children: ReactNode;
  dispatch: IDispatch;
}

export const ModalSkeleton: React.FC<ModalSkeletonProps> = ({ children, dispatch }) => {
  return (
    <div
      className="position-fixed d-flex justify-content-between align-items-center modal-z"
      style={{
        top: '0px',
        left: '0px',
        minWidth: '100%',
        minHeight: '100%',
        backgroundColor: 'rgba(0, 0, 0, .5)',
      }}
    >
      <div></div>
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 d-flex flex-column text-center p-5">
            <div className="card mt-5 border shadow" style={{ borderRadius: '1.5rem' }}>
              <div className="text-right pr-3 pt-2">
                <button
                  type="button"
                  className="close"
                  onClick={(): void => dispatch({ type: AppActionTypes.setModal, payload: '' })}
                >
                  <span aria-hidden="true" style={{ fontSize: '2rem', fontWeight: 400 }}>
                    &times;
                  </span>
                </button>
              </div>
              {children}
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';

import { deleteMember } from '../../store/reducers/user';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

import './MemberMenu.scss';

interface MemberMenuProps {
  memberId: number;
  tripId: number;
  customClass: string;
  isCreator: boolean;
  isCurrentUser: boolean;
}

function MemberMenu({
  memberId,
  tripId,
  customClass,
  isCreator,
  isCurrentUser,
}: MemberMenuProps) {
  const dispatch = useAppDispatch();

  // Declaration states variables
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(true);
  // Open the modal DeleteConfirmation
  const onClickDelete = () => {
    setShowModalDeleteConfirm(true);
  };

  console.log('membermenu TRIPID', tripId);
  console.log('membermenu MEMBERID', memberId);
  return (
    <div className={`member-menu ${customClass}`}>
      <div>
        <button className="member-menu-btn" type="button">
          Voir les infos
        </button>
      </div>
      {isCreator && !isCurrentUser && (
        <div>
          <button
            className="member-menu-btn"
            type="button"
            onClick={onClickDelete}
          >
            Supprimer
          </button>
        </div>
      )}
      {/*  */}
      {showModalDeleteConfirm && (
        <div>
          <ModalDeleteConfirm
            dispatchDeleteAction={() =>
              dispatch(deleteMember({ tripId, memberId }))
            }
            urlNavigate={`/my-trip/${tripId}`}
            title="Confirmation suppression"
            text="Êtes-vous sûr de vouloir supprimer définitivement ce voyage ?"
          />
        </div>
      )}
    </div>
  );
}
export default MemberMenu;

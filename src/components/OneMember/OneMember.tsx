import { useEffect, useRef, useState } from 'react';
import { Member, User } from '../../@types';
import { useAppDispatch } from '../../hooks/redux';

import { deleteMember } from '../../store/reducers/user';

import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

import './OneMember.scss';

interface OneMemberProps {
  tripId: number | null;
  member: Member;
  isCreator: boolean;
  dataUser: User;
  openMemberId: number | null;
  setOpenMemberId: React.Dispatch<React.SetStateAction<number | null>>;
}

function OneMember({
  tripId,
  member,
  isCreator,
  dataUser,
  openMemberId,
  setOpenMemberId,
}: OneMemberProps) {
  const dispatch = useAppDispatch();

  const isOpenMenu = member.id === openMemberId;
  const isCurrentUser = dataUser.id === member.id;

  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);
  console.log('setShowModalDeleteConfirm', setShowModalDeleteConfirm);
  // Event handler to open the modal DeleteConfirmation if click on delete a member
  const handleClick = () => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  };

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleCloseMenu = (event: MouseEvent) => {
      // Check if button not null and menu is open
      if (divRef.current && isOpenMenu) {
        if (!divRef.current.contains(event.target as Node)) {
          setOpenMemberId(null); // Close the menu
        }
      }
    };
    // Add a mouse click event listener to the document when the menu is open
    if (isOpenMenu) {
      document.addEventListener('mousedown', handleCloseMenu);
    } else {
      document.removeEventListener('mousedown', handleCloseMenu);
    }
    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleCloseMenu);
    };
  }, [isOpenMenu, setOpenMemberId]);

  // Toggle the Member Menu
  const toggleMenuMember = () => {
    if (isOpenMenu) {
      // Close the menu if the current member is already open
      setOpenMemberId(null);
    } else if (member) {
      // Open the menu of the current member
      setOpenMemberId(member.id);
    }
  };
  return (
    <li className="one-trip-members-item" key={member.id}>
      <div
        className={`one-trip-members-btn ${isOpenMenu ? 'active' : ''}`}
        onClick={toggleMenuMember}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            toggleMenuMember();
          }
        }}
        role="button"
        aria-label="Click on the member to open member menu"
        tabIndex={0}
        ref={divRef}
      >
        <i className="one-trip-members-icon fa-solid fa-user" />
        <p className="one-trip-membres-name">{member.firstname}</p>
        {isOpenMenu && (
          <div className="member-menu active">
            <button
              className="member-menu-btn"
              type="button"
              onClick={handleClick}
            >
              Voir les infos
            </button>
            {isCreator && !isCurrentUser && (
              <button
                className="member-menu-btn"
                type="button"
                onClick={handleClick}
              >
                Supprimer
              </button>
            )}
          </div>
        )}
      </div>
      {showModalDeleteConfirm && (
        <ModalDeleteConfirm
          dispatchDeleteAction={() =>
            dispatch(deleteMember({ tripId, memberId: member.id }))
          }
          urlNavigate={`/my-trip/${tripId}`}
          title="Confirmation suppression"
          text={`Êtes-vous sûr de vouloir supprimer ${member.firstname} du voyage ?`}
          closeModal={() => setShowModalDeleteConfirm(false)}
        />
      )}
    </li>
  );
}

export default OneMember;

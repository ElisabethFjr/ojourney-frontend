// Import React Hooks
import { useEffect, useRef, useState } from 'react';
// Import Interfaces
import { Member, User } from '../../@types';
// Import Redux Hooks
import { useAppDispatch } from '../../hooks/redux';
// Import Reduc Action
import { deleteMember } from '../../store/reducers/trip';
// Import Components
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';
import ModalInformationMember from '../ModalInformationMember/ModalInformationMember';
// Import Styles
import './OneMember.scss';

interface OneMemberProps {
  tripId: string | null;
  member: Member;
  isTripCreator: boolean;
  userData: User;
  openMemberId: string | null;
  setOpenMemberId: React.Dispatch<React.SetStateAction<string | null>>;
}

function OneMember({
  tripId,
  member,
  isTripCreator,
  userData,
  openMemberId,
  setOpenMemberId,
}: OneMemberProps) {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  const isOpenMenu = member.id === openMemberId;
  const isCurrentUser = userData.id === member.id;

  // State Variable
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);
  const [showModalInformationMember, setshowModalInformationMember] =
    useState<boolean>(false);

  const handleClick = () => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  };
  const handleClickInfo = () => {
    setshowModalInformationMember(!showModalInformationMember);
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
        aria-label="Cliquez sur le membre pour ouvrir le menu du mebre"
        tabIndex={0}
        ref={divRef}
      >
        <i className="one-trip-members-icon fa-solid fa-user" />
        <p className="one-trip-membres-name">{member.firstname}</p>
        {isOpenMenu && (
          <div className="member-menu">
            <button
              className="member-menu-btn"
              type="button"
              onClick={handleClickInfo}
              aria-label="Voir les informations du membre"
            >
              Voir les infos
            </button>
            {isTripCreator && !isCurrentUser && (
              <button
                className="member-menu-btn"
                type="button"
                onClick={handleClick}
                aria-label={`Supprimer ${member.firstname} du voyage`}
              >
                Supprimer
              </button>
            )}
          </div>
        )}
      </div>
      {showModalInformationMember && (
        <ModalInformationMember
          title="Carte d'information"
          lastname={`Nom : ${member.lastname}`}
          firstname={`Prénom : ${member.firstname}`}
          email={`Email : ${member.email}`}
          closeModal={() => setshowModalInformationMember(false)}
        />
      )}
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

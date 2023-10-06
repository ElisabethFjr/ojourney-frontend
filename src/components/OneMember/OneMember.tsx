import { useEffect, useRef } from 'react';
import { Trip, Member, User } from '../../@types';

import MemberMenu from '../MemberMenu/MemberMenu';

import './OneMember.scss';

interface OneMemberProps {
  tripId: number;
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
  const isOpenMenu = member.id === openMemberId;

  console.log('Member id:', member.id);
  console.log('Trip id:', tripId);
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
          <MemberMenu
            tripId={tripId}
            memberId={member.id}
            customClass="active"
            isCreator={isCreator}
            isCurrentUser={dataUser.id === member.id}
          />
        )}
      </div>
    </li>
  );
}

export default OneMember;

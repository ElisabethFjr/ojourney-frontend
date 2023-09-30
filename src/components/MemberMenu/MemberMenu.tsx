import './MemberMenu.scss';

interface MemberMenuProps {
  customClass: string;
  isCreator: boolean;
}

function MemberMenu({ customClass, isCreator }: MemberMenuProps) {
  return (
    <div className={`member-menu ${customClass}`}>
      <button className="member-menu-btn" type="button">
        Voir les infos
      </button>
      {isCreator && (
        <button className="member-menu-btn" type="button">
          Supprimer
        </button>
      )}
    </div>
  );
}

export default MemberMenu;

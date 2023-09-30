import './MemberMenu.scss';

interface MemberMenuProps {
  customClass: string;
}

function MemberMenu({ customClass }: MemberMenuProps) {
  return (
    <div className={`member-menu ${customClass}`}>
      <button className="member-menu-btn" type="button">
        Voir les infos
      </button>
      <button className="member-menu-btn" type="button">
        Supprimer
      </button>
    </div>
  );
}

export default MemberMenu;

import './MemberMenu.scss';

function MemberMenu() {
  return (
    <div className="member-menu">
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

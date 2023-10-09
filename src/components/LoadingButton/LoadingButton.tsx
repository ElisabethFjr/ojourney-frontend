import './LoadingButton.scss';

function LoadingButton() {
  return (
    <div className="container-button">
      <p className="button-loader-text">Loading...</p>
      <span className="button-loader" />
    </div>
  );
}

export default LoadingButton;

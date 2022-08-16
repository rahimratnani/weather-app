import logo from './../assets/logo.png';
import './Title.css';

export default function Title() {
  return (
    <section className="Title">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <h1 className="heading">Weather App</h1>
    </section>
  );
}

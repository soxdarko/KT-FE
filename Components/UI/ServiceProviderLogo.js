const ServiceProviderLogo = (props) => (
  <div className={props.className}>
    <img src={props.src} alt={props.alt} />
    <p>{props.salonName}</p>
  </div>
);

export default ServiceProviderLogo;

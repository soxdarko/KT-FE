const DescriptionLabel = props => (
	<p className={props.className} style={{ color: props.color }}>
		{props.text}
	</p>
);

export default DescriptionLabel;

import ContentLoader from 'react-content-loader';

const Skeleton = props => {
  const { i } = props;
  return (
    <ContentLoader
      key={i}
      speed={2}
      width={285}
      height={210}
      viewBox="0 0 285 210"
      backgroundColor="#591778"
      foregroundColor="#0510a8"
      {...props}
    >
      <rect x="120" y="140" rx="5" ry="5" width="65" height="30" />
      <rect x="27" y="176" rx="10" ry="10" width="254" height="29" />
      <rect x="92" y="25" rx="49" ry="49" width="114" height="102" />
    </ContentLoader>
  );
};

export default Skeleton;

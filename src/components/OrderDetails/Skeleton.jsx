import ContentLoader from 'react-content-loader';

const Skeleton = props => (
  <ContentLoader
    speed={2}
    width={320}
    height={210}
    viewBox="0 0 320 210"
    backgroundColor="#a3a3a3"
    foregroundColor="#bf85e5"
    {...props}
  >
    <rect x="12" y="83" rx="35" ry="35" width="293" height="98" />
  </ContentLoader>
);

export default Skeleton;

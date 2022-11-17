import resume from "./AndyMcBeathResume.pdf";

const Resume = () => {
  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return <iframe height="1100" width="100%" src={resume} />;
};

export default Resume;

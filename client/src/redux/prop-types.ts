import PropTypes from 'prop-types';
import { HandlerProps } from 'react-reflex';

export const FileType = PropTypes.shape({
  key: PropTypes.string,
  ext: PropTypes.string,
  name: PropTypes.string,
  contents: PropTypes.string,
  head: PropTypes.string,
  tail: PropTypes.string
});

export const MarkdownRemark = PropTypes.shape({
  html: PropTypes.string,
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    block: PropTypes.string,
    superBlock: PropTypes.string
  })
});

export const ChallengeNode = PropTypes.shape({
  block: PropTypes.string,
  challengeOrder: PropTypes.number,
  challengeType: PropTypes.number,
  dashedName: PropTypes.string,
  description: PropTypes.string,
  challengeFiles: PropTypes.array,
  fields: PropTypes.shape({
    slug: PropTypes.string,
    blockName: PropTypes.string
  }),
  forumTopicId: PropTypes.number,
  guideUrl: PropTypes.string,
  head: PropTypes.arrayOf(PropTypes.string),
  helpCategory: PropTypes.string,
  instructions: PropTypes.string,
  isComingSoon: PropTypes.bool,
  removeComments: PropTypes.bool,
  isLocked: PropTypes.bool,
  isPrivate: PropTypes.bool,
  order: PropTypes.number,
  required: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      raw: PropTypes.string,
      src: PropTypes.string
    })
  ),
  superOrder: PropTypes.number,
  superBlock: PropTypes.string,
  tail: PropTypes.arrayOf(PropTypes.string),
  time: PropTypes.string,
  title: PropTypes.string,
  translationPending: PropTypes.bool,
  videoUrl: PropTypes.string
});

export const AllChallengeNode = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: ChallengeNode
    })
  )
});

export const AllMarkdownRemark = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: MarkdownRemark
    })
  )
});

export const User = PropTypes.shape({
  about: PropTypes.string,
  completedChallenges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      solution: PropTypes.string,
      githubLink: PropTypes.string,
      challengeType: PropTypes.number,
      completedDate: PropTypes.number,
      challengeFiles: PropTypes.array
    })
  ),
  email: PropTypes.string,
  githubProfile: PropTypes.string,
  is2018DataVisCert: PropTypes.bool,
  isApisMicroservicesCert: PropTypes.bool,
  isBackEndCert: PropTypes.bool,
  isDataVisCert: PropTypes.bool,
  isEmailVerified: PropTypes.bool,
  isFrontEndCert: PropTypes.bool,
  isFrontEndLibsCert: PropTypes.bool,
  isFullStackCert: PropTypes.bool,
  isHonest: PropTypes.bool,
  isInfosecQaCert: PropTypes.bool,
  isQaCertV7: PropTypes.bool,
  isInfosecCertV7: PropTypes.bool,
  isJsAlgoDataStructCert: PropTypes.bool,
  isRespWebDesignCert: PropTypes.bool,
  isSciCompPyCertV7: PropTypes.bool,
  isDataAnalysisPyCertV7: PropTypes.bool,
  isMachineLearningPyCertV7: PropTypes.bool,
  linkedin: PropTypes.string,
  location: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string,
  points: PropTypes.number,
  portfolio: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      url: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string
    })
  ),
  sendQuincyEmail: PropTypes.bool,
  theme: PropTypes.string,
  twitter: PropTypes.string,
  username: PropTypes.string,
  website: PropTypes.string
});

export const CurrentCertsType = PropTypes.arrayOf(
  PropTypes.shape({
    show: PropTypes.bool,
    title: PropTypes.string,
    certSlug: PropTypes.string
  })
);

export const StepsType = PropTypes.shape({
  currentCerts: CurrentCertsType,
  isShowCerts: PropTypes.bool,
  isShowName: PropTypes.bool,
  isShowProfile: PropTypes.bool
});

// TYPESCRIPT TYPES

export type CurrentCertType = {
  show: boolean;
  title: string;
  certSlug: string;
};

export type MarkdownRemarkType = {
  fields: [{ component: string; nodeIdentity: string; slug: string }];
  fileAbsolutePath: string;
  frontmatter: {
    block: string;
    isBeta: boolean;
    superBlock: string;
    title: string;
  };
  headings: [
    {
      depth: number;
      value: string;
      id: string;
    }
  ];
  html: string;
  htmlAst: Record<string, unknown>;
  id: string;
  rawMarkdownBody: string;
  timeToRead: number;
  wordCount: {
    paragraphs: number;
    sentences: number;
    words: number;
  };
};

type Question = { text: string; answers: string[]; solution: number };
type Fields = { slug: string; blockName: string; tests: Tests[] };
type Required = {
  link: string;
  raw: boolean;
  src: string;
  crossDomain?: boolean;
};

export type ChallengeNodeType = {
  block: string;
  challengeOrder: number;
  challengeType: number;
  dashedName: string;
  description: string;
  challengeFiles: ChallengeFile[] | null;
  fields: Fields;
  forumTopicId: number;
  guideUrl: string;
  head: string[];
  helpCategory: string;
  id: string;
  instructions: string;
  isComingSoon: boolean;
  removeComments: boolean;
  isLocked: boolean;
  isPrivate: boolean;
  order: number;
  question: Question;
  required: Required[];
  superOrder: number;
  superBlock: string;
  tail: string[];
  time: string;
  title: string;
  translationPending: boolean;
  url: string;
  videoId: string;
  videoUrl: string;
};

export type AllChallengeNodeType = {
  edges: [
    {
      node: ChallengeNodeType;
    }
  ];
};

export type AllMarkdownRemarkType = {
  edges: [
    {
      node: MarkdownRemarkType;
    }
  ];
};

export type ResizePropsType = {
  onStopResize: (arg0: HandlerProps) => void;
  onResize: () => void;
};

export type DimensionsType = {
  height: number;
  width: number;
};

export type Tests = {
  text: string;
  testString: string;
  // challengeSchema suggests this exists. GraphQL disagrees
  id?: string;
  // for certificate verification
  title?: string;
  pass?: boolean;
  err?: string;
};

export type UserType = {
  about: string;
  acceptedPrivacyTerms: boolean;
  completedChallenges: CompletedChallenge[];
  currentChallengeId: string;
  email: string;
  emailVerified: boolean;
  githubProfile: string;
  isBanned: boolean;
  isCheater: boolean;
  isHonest: boolean;
  linkedin: string;
  location: string;
  name: string;
  picture: string;
  points: number;
  portfolio: PortfolioType[];
  profileUI: {
    isLocked: boolean;
    showCerts: boolean;
    showName: boolean;
  };
  progressTimestamps: Array<unknown>;
  sendQuincyEmail: boolean;
  theme: string;
  twitter: string;
  username: string;
  website: string;
} & isCertifiedTypes;

export type isCertifiedTypes = {
  is2018DataVisCert: boolean;
  isApisMicroservicesCert: boolean;
  isBackEndCert: boolean;
  isDataVisCert: boolean;
  isEmailVerified: boolean;
  isFrontEndCert: boolean;
  isFrontEndLibsCert: boolean;
  isFullStackCert: boolean;
  isInfosecQaCert: boolean;
  isQaCertV7: boolean;
  isInfosecCertV7: boolean;
  isJsAlgoDataStructCert: boolean;
  isRespWebDesignCert: boolean;
  isSciCompPyCertV7: boolean;
  isDataAnalysisPyCertV7: boolean;
  isMachineLearningPyCertV7: boolean;
};

export type CompletedChallenge = {
  id: string;
  solution?: string | null;
  githubLink?: string;
  challengeType?: number;
  completedDate: number;
  challengeFiles: ChallengeFile[];
};

export type ExtTypes = 'js' | 'html' | 'css' | 'jsx';
export type FileKeyTypes = 'indexjs' | 'indexhtml' | 'indexcss';

export type ChallengeMetaType = {
  block: string;
  id: string;
  introPath: string;
  nextChallengePath: string;
  prevChallengePath: string;
  removeComments: boolean;
  superBlock: string;
  title?: string;
  challengeType?: number;
  helpCategory: string;
};

export type PortfolioType = {
  id: string;
  title?: string;
  url?: string;
  image?: string;
  description?: string;
};

export type FileKeyChallengeType = {
  contents: string;
  ext: ExtTypes;
  head: string;
  id: string;
  key: FileKeyTypes;
  name: string;
  tail: string;
};

// This looks redundant - same as ChallengeNodeType above?
// TODO: @moT01 Yes, it is an almost duplicate because @ojeytonwilliams
// does not allow us to add 'Type' at the end...
// The below is more accurate, because it was built based on graphql's
// interpretation of what we have. The props commented out are what we
// think are on the node, but actually do not exist.
export type ChallengeNode = {
  block: string;
  challengeFiles: ChallengeFile[];
  challengeOrder: number;
  challengeType: number;
  dashedName: string;
  description: string;
  fields: {
    slug: string;
    blockName: string;
    tests: Tests[];
  };
  forumTopicId: number;
  // guideUrl: string;
  // head: string[];
  helpCategory: string;
  id: string;
  instructions: string;
  internal?: {
    content: string;
    contentDigest: string;
    description: string;
    fieldOwners: string[];
    ignoreType: boolean | null;
    mediaType: string;
    owner: string;
    type: string;
  };
  order: number;
  question: {
    answers: string[];
    solution: number;
    text: string;
  } | null;
  removeComments: boolean;
  required: [
    {
      link: string;
      raw: string;
      src: string;
    }
  ];
  solutions: {
    [T in FileKeyTypes]: FileKeyChallengeType;
  };
  sourceInstanceName: string;
  superBlock: string;
  superOrder: number;
  template: string;
  tests: Tests[];
  time: string;
  title: string;
  translationPending: boolean;
  videoId?: string;
  videoUrl?: string;
  // isComingSoon: boolean;
  // isLocked: boolean;
  // isPrivate: boolean;
  // tail: string[];
};

// Extra types built from challengeSchema

export type ChallengeFile = {
  fileKey: string;
  ext: ExtTypes;
  name: string;
  editableRegionBoundaries: number[];
  path: string;
  error: null | string;
  head: string;
  tail: string;
  seed: string;
  contents: string;
  id: string;
  history: [[string], string];
} | null;

export interface ChallengeSchema {
  block: string;
  blockId: string;
  challengeOrder: number;
  removeComments: boolean;
  // TODO: should be typed with possible values
  challengeType: number;
  checksum: number;
  __commentCounts: Record<string, unknown>;
  dashedName: string;
  description: string;
  challengeFiles: ChallengeFile[];
  guideUrl: string;
  // TODO: should be typed with possible values
  helpCategory: string;
  videoUrl: string;
  forumTopicId: number;
  id: string;
  instructions: string;
  isComingSoon: boolean;
  // TODO: Do we still use this
  isLocked: boolean;
  isPrivate: boolean;
  order: number;
  videoId?: string;
  question: Question;
  required: Required[];
  solutions: ChallengeFile[][];
  superBlock: string;
  superOrder: number;
  suborder: number;
  tests: Tests[];
  template: string;
  time: string;
  title: string;
  translationPending: boolean;
  url?: string;
}

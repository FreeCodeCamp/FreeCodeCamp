import PropTypes from 'prop-types';

const FileType = PropTypes.shape({
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
  files: PropTypes.shape({
    indexhtml: FileType,
    indexjs: FileType
  }),
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
      files: PropTypes.array
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
  sound: PropTypes.bool,
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
export type ChallengeNodeType = {
  block: string;
  challengeOrder: number;
  challengeType: number;
  dashedName: string;
  description: string;
  challengeFiles: ChallengeFileType[];
  fields: {
    slug: string;
    blockName: string;
    tests: TestType[];
  };
  files: ChallengeFileType;
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
  question: {
    text: string;
    answers: string[];
    solution: number;
  };
  required: [
    {
      link: string;
      raw: string;
      src: string;
    }
  ];
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
  onStopResize: (arg0: React.ChangeEvent) => void;
  onResize: () => void;
};

export type DimensionsType = {
  height: number;
  width: number;
};

export type TestType = {
  text: string;
  testString: string;
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
  sound: boolean;
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
  challengeFiles: ChallengeFileType[] | null;
  // TODO: remove once files->challengeFiles is refactored
  files?: ChallengeFileType[] | null;
};
// TODO: renames: files => challengeFiles; key => fileKey; #42489
export type ChallengeFileType =
  | {
      [T in FileKeyTypes]:
        | ({
            editableContents: string;
            editableRegionBoundaries: number[];
            error?: string | null;
            history: string[];
            path: string;
            seed: string;
            seedEditableRegionBoundaries?: number[];
          } & FileKeyChallengeType)
        | null;
    }
  | Record<string, never>;

export type ExtTypes = 'js' | 'html' | 'css' | 'jsx';
export type FileKeyTypes = 'indexjs' | 'indexhtml' | 'indexcss';

export type ChallengeFilesType =
  | {
      indexcss: ChallengeFileType;
      indexhtml: ChallengeFileType;
      indexjs: ChallengeFileType;
      indexjsx: ChallengeFileType;
    }
  | Record<string, never>;

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
  challengeFiles: ChallengeFileType;
  challengeOrder: number;
  challengeType: number;
  dashedName: string;
  description: string;
  fields: {
    slug: string;
    blockName: string;
    tests: TestType[];
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
  tests: TestType[];
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

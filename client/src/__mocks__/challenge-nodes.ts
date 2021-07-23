interface MockChallengeProps {
  fields?: {
    slug?: string;
    blockName?: string;
  };
  id?: string;
  block?: string;
  title?: string;
  isPrivate?: boolean;
  superBlock: string;
  dashedName?: string;
}

type Nodes = Array<MockChallengeProps>;

const mockChallengeNodes: Nodes = [
  {
    fields: {
      slug: '/super-block-one/block-a/challenge-one',
      blockName: 'Block A'
    },
    id: 'a',
    block: 'block-a',
    title: 'Challenge One',
    isPrivate: false,
    superBlock: 'super-block-one',
    dashedName: 'challenge-one'
  },
  {
    fields: {
      slug: '/super-block-one/block-a/challenge-two',
      blockName: 'Block A'
    },
    id: 'b',
    block: 'block-a',
    title: 'Challenge Two',
    isPrivate: false,
    superBlock: 'super-block-one',
    dashedName: 'challenge-two'
  },
  {
    fields: {
      slug: '/super-block-one/block-b/challenge-one',
      blockName: 'Block B'
    },
    id: 'c',
    block: 'block-b',
    title: 'Challenge One',
    isPrivate: false,
    superBlock: 'super-block-one',
    dashedName: 'challenge-one'
  },
  {
    fields: {
      slug: '/super-block-one/block-b/challenge-two',
      blockName: 'Block B'
    },

    id: 'd',
    block: 'block-b',
    title: 'Challenge Two',
    isPrivate: false,
    superBlock: 'super-block-one',
    dashedName: 'challenge-two'
  },
  {
    fields: {
      slug: '/super-block-one/block-c/challenge-one',
      blockName: 'Block C'
    },
    id: 'e',
    block: 'block-c',
    title: 'Challenge One',
    isPrivate: true,
    superBlock: 'super-block-one',
    dashedName: 'challenge-one'
  },
  {
    fields: {
      slug: '/super-block-two/block-a/challenge-one',
      blockName: 'Block A'
    },
    id: 'f',
    block: 'block-a',
    title: 'Challenge One',
    isPrivate: false,
    superBlock: 'super-block-two',
    dashedName: 'challenge-one'
  },
  {
    fields: {
      slug: '/super-block-two/block-a/challenge-two',
      blockName: 'Block A'
    },
    id: 'g',
    block: 'block-a',
    title: 'Challenge Two',
    isPrivate: false,
    superBlock: 'super-block-two',
    dashedName: 'challenge-two'
  },
  {
    fields: {
      slug: '/super-block-two/block-b/challenge-one',
      blockName: 'Block B'
    },
    id: 'h',
    block: 'block-b',
    title: 'Challenge One',
    isPrivate: false,
    superBlock: 'super-block-two',
    dashedName: 'challenge-one'
  },
  {
    fields: {
      slug: '/super-block-two/block-b/challenge-two',
      blockName: 'Block B'
    },
    id: 'i',
    block: 'block-b',
    title: 'Challenge Two',
    isPrivate: false,
    superBlock: 'super-block-two',
    dashedName: 'challenge-two'
  },
  {
    fields: {
      slug: '/super-block-three/block-a/challenge-one',
      blockName: 'Block A'
    },
    id: 'j',
    block: 'block-a',
    title: 'Challenge One',
    isPrivate: false,
    superBlock: 'super-block-three',
    dashedName: 'challenge-one'
  },
  {
    fields: {
      slug: '/super-block-three/block-c/challenge-two',
      blockName: 'Block C'
    },
    id: 'k',
    block: 'block-c',
    title: 'Challenge Two',
    isPrivate: false,
    superBlock: 'super-block-three',
    dashedName: 'challenge-two'
  }
];

export default mockChallengeNodes;

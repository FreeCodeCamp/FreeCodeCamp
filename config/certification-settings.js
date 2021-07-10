const certTypes = {
  frontEnd: 'isFrontEndCert',
  backEnd: 'isBackEndCert',
  dataVis: 'isDataVisCert',
  respWebDesign: 'isRespWebDesignCert',
  frontEndDevLibs: 'isFrontEndLibsCert',
  dataVis2018: 'is2018DataVisCert',
  jsAlgoDataStruct: 'isJsAlgoDataStructCert',
  apisMicroservices: 'isApisMicroservicesCert',
  infosecQa: 'isInfosecQaCert',
  qaV7: 'isQaCertV7',
  infosecV7: 'isInfosecCertV7',
  sciCompPyV7: 'isSciCompPyCertV7',
  dataAnalysisPyV7: 'isDataAnalysisPyCertV7',
  machineLearningPyV7: 'isMachineLearningPyCertV7',
  fullStack: 'isFullStackCert',
  relationalDatabasesV8: 'isRelationalDatabasesCertV8'
};

const certIds = {
  legacyFrontEndChallengeId: '561add10cb82ac38a17513be',
  legacyBackEndChallengeId: '660add10cb82ac38a17513be',
  legacyDataVisId: '561add10cb82ac39a17513bc',
  legacyInfosecQaId: '561add10cb82ac38a17213bc',
  legacyFullStackId: '561add10cb82ac38a17213bd',
  respWebDesignId: '561add10cb82ac38a17513bc',
  frontEndDevLibsId: '561acd10cb82ac38a17513bc',
  dataVis2018Id: '5a553ca864b52e1d8bceea14',
  jsAlgoDataStructId: '561abd10cb81ac38a17513bc',
  apisMicroservicesId: '561add10cb82ac38a17523bc',
  qaV7Id: '5e611829481575a52dc59c0e',
  infosecV7Id: '5e6021435ac9d0ecd8b94b00',
  sciCompPyV7Id: '5e44431b903586ffb414c951',
  dataAnalysisPyV7Id: '5e46fc95ac417301a38fb934',
  machineLearningPyV7Id: '5e46fc95ac417301a38fb935',
  relationalDatabasesV8Id: '606243f50267e718b1e755f4'
};

const completionHours = {
  [certTypes.frontEnd]: 400,
  [certTypes.backEnd]: 400,
  [certTypes.dataVis]: 400,
  [certTypes.infosecQa]: 300,
  [certTypes.fullStack]: 1800,
  [certTypes.respWebDesign]: 300,
  [certTypes.frontEndDevLibs]: 300,
  [certTypes.jsAlgoDataStruct]: 300,
  [certTypes.dataVis2018]: 300,
  [certTypes.apisMicroservices]: 300,
  [certTypes.qaV7]: 300,
  [certTypes.infosecV7]: 300,
  [certTypes.sciCompPyV7]: 300,
  [certTypes.dataAnalysisPyV7]: 300,
  [certTypes.machineLearningPyV7]: 300,
  [certTypes.relationalDatabasesV8]: 300
};

const certSlugTypeMap = {
  // legacy
  'legacy-front-end': certTypes.frontEnd,
  'legacy-back-end': certTypes.backEnd,
  'legacy-data-visualization': certTypes.dataVis,
  // Keep these slugs the same so we don't
  // break existing links
  'information-security-and-quality-assurance': certTypes.infosecQa,
  'full-stack': certTypes.fullStack,

  // modern
  'responsive-web-design': certTypes.respWebDesign,
  'javascript-algorithms-and-data-structures': certTypes.jsAlgoDataStruct,
  'front-end-development-libraries': certTypes.frontEndDevLibs,
  'data-visualization': certTypes.dataVis2018,
  'back-end-development-and-apis': certTypes.apisMicroservices,
  'quality-assurance-v7': certTypes.qaV7,
  'information-security-v7': certTypes.infosecV7,
  'scientific-computing-with-python-v7': certTypes.sciCompPyV7,
  'data-analysis-with-python-v7': certTypes.dataAnalysisPyV7,
  'machine-learning-with-python-v7': certTypes.machineLearningPyV7,
  'relational-databases-v8': certTypes.relationalDatabasesV8
};

const superBlockCertTypeMap = {
  // legacy
  'legacy-front-end': certTypes.frontEnd,
  'legacy-back-end': certTypes.backEnd,
  'legacy-data-visualization': certTypes.dataVis,
  'information-security-and-quality-assurance': certTypes.infosecQa,
  'full-stack': certTypes.fullStack,

  // modern
  'responsive-web-design': certTypes.respWebDesign,
  'javascript-algorithms-and-data-structures': certTypes.jsAlgoDataStruct,
  'front-end-development-libraries': certTypes.frontEndDevLibs,
  'data-visualization': certTypes.dataVis2018,
  'back-end-development-and-apis': certTypes.apisMicroservices,
  'quality-assurance': certTypes.qaV7,
  'information-security': certTypes.infosecV7,
  'scientific-computing-with-python': certTypes.sciCompPyV7,
  'data-analysis-with-python': certTypes.dataAnalysisPyV7,
  'machine-learning-with-python': certTypes.machineLearningPyV7,
  'relational-databases': certTypes.relationalDatabasesV8
};

const certTypeIdMap = {
  [certTypes.frontEnd]: certIds.legacyFrontEndChallengeId,
  [certTypes.backEnd]: certIds.legacyBackEndChallengeId,
  [certTypes.dataVis]: certIds.legacyDataVisId,
  [certTypes.infosecQa]: certIds.legacyInfosecQaId,
  [certTypes.fullStack]: certIds.legacyFullStackId,
  [certTypes.respWebDesign]: certIds.respWebDesignId,
  [certTypes.frontEndDevLibs]: certIds.frontEndDevLibsId,
  [certTypes.jsAlgoDataStruct]: certIds.jsAlgoDataStructId,
  [certTypes.dataVis2018]: certIds.dataVis2018Id,
  [certTypes.apisMicroservices]: certIds.apisMicroservicesId,
  [certTypes.qaV7]: certIds.qaV7Id,
  [certTypes.infosecV7]: certIds.infosecV7Id,
  [certTypes.sciCompPyV7]: certIds.sciCompPyV7Id,
  [certTypes.dataAnalysisPyV7]: certIds.dataAnalysisPyV7Id,
  [certTypes.machineLearningPyV7]: certIds.machineLearningPyV7Id,
  [certTypes.relationalDatabasesV8]: certIds.relationalDatabasesV8Id
};

const certTypeTitleMap = {
  [certTypes.frontEnd]: 'Legacy Front End',
  [certTypes.backEnd]: 'Legacy Back End',
  [certTypes.dataVis]: 'Legacy Data Visualization',
  [certTypes.infosecQa]: 'Legacy Information Security and Quality Assurance',
  [certTypes.fullStack]: 'Legacy Full Stack',
  [certTypes.respWebDesign]: 'Responsive Web Design',
  [certTypes.frontEndDevLibs]: 'Front End Development Libraries',
  [certTypes.jsAlgoDataStruct]: 'JavaScript Algorithms and Data Structures',
  [certTypes.dataVis2018]: 'Data Visualization',
  [certTypes.apisMicroservices]: 'Back End Development and APIs',
  [certTypes.qaV7]: 'Quality Assurance',
  [certTypes.infosecV7]: 'Information Security',
  [certTypes.sciCompPyV7]: 'Scientific Computing with Python',
  [certTypes.dataAnalysisPyV7]: 'Data Analysis with Python',
  [certTypes.machineLearningPyV7]: 'Machine Learning with Python',
  [certTypes.relationalDatabasesV8]: 'Relational Databases'
};

exports.oldDataVizId = '561add10cb82ac38a17513b3';
exports.completionHours = completionHours;
exports.certTypes = certTypes;
exports.superBlockCertTypeMap = superBlockCertTypeMap;
exports.certSlugTypeMap = certSlugTypeMap;
exports.certIds = certIds;
exports.certTypeIdMap = certTypeIdMap;
exports.certTypeTitleMap = certTypeTitleMap;

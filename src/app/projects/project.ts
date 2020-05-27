export class Project {
  uuid: string;
  name: string;
  description: string;
  type: number;
  projectDataFormat: number;
  projectDataLoc: string;
  tagsLoc: string;
  taggedByLoc: string;
  tags: Tag[];
  silverStandardLoc: string;
  status: number;
  created: Date;
  lastUpdate: Date;
  lastLabelSubmission: Date;
  numTaggedRows: number;
  numTotalRows: number;
}

export class Tag {
  uuid: string;
  tag: string;
}

export enum ProjectType {
  SentimentAnalysis = 0,
  DocumentClassification,
  POSTagging,
  NERTagging
}

export enum ProjectDataFormat {
  CSV = 0,
  TXT
}

export class ProjectTypeUtil {
  public static getProjectTypeName(projectType: ProjectType) {
    switch (projectType) {
      case ProjectType.SentimentAnalysis:
        return 'Sentiment Analysis';
      case ProjectType.DocumentClassification:
        return 'Document Classification';
      case ProjectType.POSTagging:
        return 'Part of Speech Tagging';
      case ProjectType.NERTagging:
        return 'Named-Entity Recognition Tagging';
    }
  }
}

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
        // S3 bucket for Playwright reports
        const reportsBucket = new s3.Bucket(this, 'PlaywrightReportsBucket01', {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            enforceSSL: true,
            removalPolicy: cdk.RemovalPolicy.RETAIN,
            autoDeleteObjects: false,
            
        });
        // CodeBuild project to run Playwright tests
        const project = new codebuild.Project(this, 'PlaywrightTestProject01', {
            source: codebuild.Source.gitHub({
                owner: 'Surge0101',
                repo: 'Playwright',
            }),

            environment: {
                buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
            }
        });
    }
}


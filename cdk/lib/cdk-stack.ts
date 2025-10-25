import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
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
        const serviceRole = iam.Role.fromRoleArn(
            this, 
            'ImportedRole',
            'arn:aws:iam::448658736684:role/service-role/AWS-Playwright',
        //#use Enviroment varable line this 'arn:aws:iam::${ACCOUNT_ID}:role/YourCodeBuildRole', ???
        );
        // CodeBuild project to run Playwright tests

        const project = new codebuild.Project(this, 'PlaywrightTestProject01', {
            source: codebuild.Source.gitHub({
                owner: 'Surge0101',
                repo: 'Playwright',
                branchOrRef: 'main'
            }),
        
            // Use a standard Linux build image that supports Playwright
            environment: {
                buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_5,
                environmentVariables: {
                    ENV: { value: 'test'},
                    BUCKET_NAME: { value: 'cdkstack-playwrightreportsbucket01c89a4895-ja8z6mlfhxnh' },
                },

            },
            buildSpec: codebuild.BuildSpec.fromSourceFilename('cdk/buildspec.yml'),
            role: serviceRole,


        });
            
    }
}


import { App, Stack, aws_codebuild } from "aws-cdk-lib";
import { Construct } from "constructs";

export class MyStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const source = aws_codebuild.Source.gitHub({
      owner: "harrysolovay",
      repo: "testing_codebuild",
      webhook: true,
      webhookFilters: [
        aws_codebuild.FilterGroup.inEventOf(
          aws_codebuild.EventAction.PUSH
        ).andBranchIs("master"),
      ],
    });
    new aws_codebuild.Project(this, "MyProject", {
      buildSpec: aws_codebuild.BuildSpec.fromObject({
        version: "0.2",
        phases: {
          build: {
            commands: ['echo "Hello CodeBuild!"'],
          },
        },
        source,
      }),
    });
  }
}

const app = new App();

new MyStack(app, "testing-codebuild");

app.synth();

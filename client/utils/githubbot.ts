import { Probot, run } from 'probot';
// FIXME: 전체적으로 feasibility check를 위해 임시로 만든 코드. 정리 필요.

// https://github.com/settings/apps/carillon-bot
// https://github.com/settings/installations/23994801
// https://andrewlock.net/creating-my-first-github-app-with-probot-part-2-creating-the-auto-assign-issues-bot/

// Webhook URL 설정 (https://github.com/settings/apps/carillon-bot)
// 배포시
// https://label-dev.carillon.ai/api/webhooks/github
// 로컬 테스트시(ngrok로 생성된 임시 url이므로 계속 변경됨)
// https://dabb-1-235-202-130.ngrok.io/api/webhooks/github

export const app = (app: Probot) => {
  app.log('Carillon AI Github Integration');

  // app.on(['issue_comment'], async (context) => {
  //   // console.info('user', context.payload.sender.login);
  //   if (context.isBot) {
  //     return;
  //   }
  //   try {
  //     const body =
  //       context.payload.sender.login +
  //       ' at ' +
  //       new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  //     const issueComment = context.issue({ body });
  //     await context.octokit.issues.createComment(issueComment);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

  app.on(['issues.opened'], async (context) => {
    const currentLabels = context.payload.issue.labels?.map((elem) => elem.name) ?? [];
    currentLabels.push('bug');
    const newLabels = [...new Set(currentLabels)];
    const updateResponse = await context.octokit.issues.update({
      owner: context.issue().owner,
      repo: context.payload.repository.name,
      issue_number: context.payload.issue.number,
      labels: newLabels,
    });
  });

  app.on(['issues.opened'], async (context) => {
    const titlePrefixToAssigner = {
      '<server>': ['phcmas1'],
      '<client>': ['jakecarillon'],
      '<infra>': ['phcmas1', 'jakecarillon'],
    };

    console.info(`[${process.env.NODE_ENV}] user: ${context.payload.sender.login}`);

    // create an empty params object as an easy way to get the owner
    const owner = context.issue().owner;
    console.info(owner);
    // build the request, and send it to GitHub
    // const addAssigneeParams = context.issue({ assignees: ['jakecarillon'] });
    // await context.octokit.issues.addAssignees(addAssigneeParams);

    // TODO: telegram integration
    // context.payload.issue
    // url, title, body

    Object.entries(titlePrefixToAssigner).forEach(async ([prefix, assignees]) => {
      // console.info(prefix, assignees);
      if (context.payload.issue.title.startsWith(prefix)) {
        const addAssigneeParams = context.issue({ assignees });
        await context.octokit.issues.addAssignees(addAssigneeParams);

        const orPrefix = Object.keys(titlePrefixToAssigner).join('|');
        const regex = new RegExp(orPrefix, 'gi');
        const updateResponse = await context.octokit.issues.update({
          owner,
          repo: context.payload.repository.name,
          issue_number: context.payload.issue.number,
          title: context.payload.issue.title.replace(regex, '').trim(),
        });
      }
    });

    // if (context.payload.issue.title.startsWith('<server>')) {
    //   const assignees = context.issue({ assignees: titlePrefixToAssigner['<server>'] });
    //   await context.octokit.issues.addAssignees(assignees);
    // } else if (context.payload.issue.title.startsWith('<client>')) {
    //   const assignees = context.issue({ assignees: ['jakecarillon'] });
    //   await context.octokit.issues.addAssignees(assignees);
    // } else if (['jakecarillon', 'phcmas1'].includes(context.payload.sender.login)) {
    //   const assignees = context.issue({ assignees: [context.payload.sender.login] });
    //   await context.octokit.issues.addAssignees(assignees);
    // } else {
    //   // const assignees = context.issue({ assignees: ['jakecarillon', 'phcmas1'] });
    //   // await context.octokit.issues.addAssignees(assignees);

    //   const assignees1 = context.issue({ assignees: ['jakecarillon'] });
    //   await context.octokit.issues.addAssignees(assignees1);

    //   const assignees2 = context.issue({ assignees: ['phcmas1'] });
    //   await context.octokit.issues.addAssignees(assignees2);
    // }

    // if(context.payload.issue.body.includes('#label')){
    //   const addLabelsParams = context.issue({ labels: ['label1', 'label2'] });
    //   await context.octokit.issues.addLabels(addLabelsParams);
    // }

    // const possible = await context.octokit.issues.checkUserCanBeAssigned({
    //   owner: context.payload.repository.owner.login,
    //   assignee: context.payload.sender.login,
    //   repo: context.payload.repository.name,
    // });
    // if (possible) {
    //   const assigneeName = context.payload.issue.user.login;
    //   console.info(assigneeName);
    //   // const assignee = context.issue({ assignee: context.payload.issue.user.login });
    //   // const assignee = context.issue({ assignee: 'jakecarillon' });
    //   const assignee = context.issue({
    //     assignee: 'Jake',
    //   });
    //   await context.octokit.issues.addAssignees(assignee);
    //   const issueComment = context.issue({ body: 'auto assign' });
    //   await context.octokit.issues.createComment(issueComment);
    // } else {
    //   // throw new Error('User is not assignable');
    // }
  });

  app.on(['pull_request.opened'], async (context) => {
    const newBranch = await context.octokit.git.createRef({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      // ref: 'refs/heads/master',
      // sha: context.payload.pull_request.head.sha,
      ref: context.payload.pull_request.head.ref,
      sha: context.payload.pull_request.head.sha,
    });
  });
};

export default app;

// run probot app programatically instead of `probot run ./dist/index.js` at package.json
// run(app);

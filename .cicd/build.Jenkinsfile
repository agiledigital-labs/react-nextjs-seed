library 'node811-jenkins-library'

final project = "Project"   //ToDo #@Change-this

def volumes = [
  node811BuilderPersistentVolumes(
    project: project
  )
].flatten()

@NonCPS def uniqueBy(List items, String key) {
  return items.unique { a,b -> a[key] <=> b[key]}
}


def notifySlack(String buildStatus = 'STARTED') {
    // Build status of null means success.
    buildStatus = buildStatus ?: 'SUCCESS'

    def color

    if (buildStatus == 'STARTED') {
        color = '#D4DADF'
    } else if (buildStatus == 'SUCCESS') {
        color = '#BDFFC3'
    } else if (buildStatus == 'UNSTABLE') {
        color = '#FFFE89'
    } else {
        color = '#FF9FA1'
    }

    def msg = "${buildStatus}: `${env.JOB_NAME}` #${env.BUILD_NUMBER} (<${env.BUILD_URL}|link>)"

    slackSend(channel: '#@Change-this', color: color, message: msg) //todo: configure channel elsewhere for templating
}

def volumeClaims = uniqueBy(volumes, 'path').collect { volume ->
  persistentVolumeClaim(
    claimName: volume.claimName,
    mountPath: volume.path
  )
}

def containers = [
  [containerTemplate(
    name: 'jnlp',
    image: 'openshift/jenkins-slave-base-centos7:v3.7',
    args: '${computer.jnlpmac} ${computer.name}'
  )],
  node811BuilderContainerTemplate()
].flatten()

def buildNumber = env.BUILD_NUMBER;

podTemplate(label: "${project}-build-pod", cloud: 'openshift', containers: containers, volumes: volumeClaims) {
  node("${project}-build-pod") {

    final builds = [:]
    final buildStage = (env.BRANCH_NAME == 'master') ? 'dist' : 'test'
    def gitCommitHash = "unknown"

    builds["Build Node JS 8.11 Components"] = {
      buildNode811Component(
        baseDir: ".",
        project: project,
        component: "client",
        buildNumber: buildNumber,
        stage: buildStage,
        builder: "node811"
      )
    }

    try {
      stage('Notify Slack') {
        notifySlack()
      }
      stage('Checkout code') {
        checkout scm
      }
      stage('Run parallel builds') {
        parallel(builds)
      }

      if (env.BRANCH_NAME == "master") {
        stage('Trigger staging deployment') {
          archiveArtifacts '.cicd/deploy.yml'
          build job: '../Deploy Staging', parameters: [[$class: 'StringParameterValue', name: 'BUILD_ARTIFACT_NUMBER', value: BUILD_NUMBER]], wait: false
        }
      }
    } catch (InterruptedException e) {
      // Build interupted
      currentBuild.result = "ABORTED"
      throw e
    } catch (e) {
      // If there was an exception thrown, the build failed
      currentBuild.result = "FAILED"
      throw e
    } finally {
      // Success or failure, always send notifications
      notifySlack(currentBuild.result)
    }
  }
}

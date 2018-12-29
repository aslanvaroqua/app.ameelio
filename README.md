Install script

To install or update nvm, you can use the install script using cURL:

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

or Wget:

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

Note: If the environment variable $XDG_CONFIG_HOME is present, it will place the nvm files there.

export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm



Install NPM (Node Package Manager)
nvm install stable && nvm use stable

Install YARN
nvm install yarn -g

YARN INSTALL
yarn install

to be continued....


IMAGES -> 

DOCS ->

JIRA



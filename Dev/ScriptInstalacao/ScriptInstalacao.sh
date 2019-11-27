#!/bin/bash

cd ~

mkdir securIT

cd securIT

cp /home/estagiario/Área\ de\ Trabalho/securIT/Dev/securit.jar securit.jar

chmod +x securit.jar

which java

if [ $? = 0 ]
	then echo "OK"
	else sudo add-apt-repository ppa:webupd8team/java
fi

echo java -jar securit.jar > SecurITExec.sh

chmod +x SecurITExec.sh

sudo cp SecurITExec.sh /usr/local/bin/SecurITExec.sh


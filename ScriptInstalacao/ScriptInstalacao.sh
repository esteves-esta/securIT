#!/bin/bash

echo "A instalação de seu software de monitoração securIT começou..."

cd ~

mkdir securit

cd securit

cp $HOME/Área\ de\ Trabalho/securIT/Dev/securit.jar securit.jar

chmod +x securit.jar

which java

echo "..."

if [ $? = 0 ]
	then echo "Prosseguindo a instalação"
	else sudo add-apt-repository ppa:webupd8team/java
fi


echo java -jar $HOME/securit/securit.jar > securIT.txt

chmod +x $HOME/securit/securit.jar

sudo cp $HOME/securit/securit.jar /usr/local/bin/securit

echo "..."

echo "A instalação foi executada com sucesso. Apenas entre na pasta $HOME/securit e clique duas vezes no arquivo securit.jar"


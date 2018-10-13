# Web Crawlers Implementation in Java

This project involves the development of a small scale web crawler to gather information from the desired website. This web crawler stores URLs of every page browsed and of every URLs found inside. The gathered information is then converted to a Lucene document and stored in the index. The time taken to search the index is very short when compared with how long it takes for a relational database to process a query.

## Software Required

### JDK
- Download Java Development Kit if not present from the below links.
-	For 32-bit version of windows -  http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-windows-i586.exe
-	For 64-bit version of windows - http://download.oracle.com/otn-pub/java/jdk/8u131-b11/d54c1d3a095b4ff2b6607d096fa80163/jdk-8u131-windows-x64.exe
-	Install Java in any directorybut make sure you add all the environmental variables required.

### Cygwin 
Cygwin is a Unix-like environment and command-line interface for Microsoft Windows.
-	For 32-bit versions of windows - https://cygwin.com/setup-x86.exe
-	For 64-bit versions of windows - https://cygwin.com/setup-x86_64.exe
-	Install Cygwin in the default directory which is C:\cygwin64
-	Add C:\cygwin64\binto path in system variables 

### Eclipse Neon 
Eclipse is an integrated development environment (IDE) used in computer programming, and is the most widely used Java IDE.
-	For 32-bit versions of Eclipse Neon- here
-	For 64-bit versions of Eclipse Neon - here

### Tomcat 8.5.16
-	Download Tomcat 8.5.16 zip from here
-	Extract the zip to C:drive
-	Setting up environmental variables
  -	Set CATALINA_HOME=C:\ "top level directory of your Tomcat install"
  -	Add %CATALINA_HOME%\bin to your path.

### Maven 3.5.0
-	Download maven 3.5.0 zip from here
-	Extract the Zip file to C: drive
-	Add M2_HOME to system variables and set it to C:\ "top level directory of your maven install"

### Apache Nutch 1.1
-	Download Link - http://archive.apache.org/dist/nutch/apache-nutch-1.1-bin.zip
-	Extract the Zip file to C:\cygwin64\home 
-	To verify apache-nutch-1.1 integrity open Cygwin and navigate to ${APACHE_NUTCH_HOME} i.e,C:/cygwin64/home/apache-nutch-1.1-bin/and type bin/nutch command and hitenter. Ifyou see output like this then Nutch is working 
-	Open regex-urlfilter.txt  present in the  C:\cygwin64\home\apache-nutch-1.1-bin\conf directory
-	Replace its contents with +.
-	Next open crawl-urlfilter.txtin the same directory  and replace all the content with 
```
# skip URLs that use these schemes - file:, ftp:, and mailto:
-^(file|ftp|mailto):
# skip multimedia and other types we can't yet parse. This also applies to those with cache-busting dummy parameters
-\.(gif|jpg|png|ico|css|eps|zip|mpg|gz|rpm|tgz|mov|exe|bmp|js|mp3)[\?\w]*$
# exclude these directories
-/temp/
-/tmp/
+.
```
-	crawl-urlfilter.txt should look something like this.
-	openregex-urlfilter.txt present in the same directory and replace its content to +.
-	Next open nutch-site.xml present in the directory C:\cygwin64\home\apache-nutch-1.1-bin\conf and add these values to the file
```
<property>
<name>plugin.includes</name>
<value>
nutch-extensionpoints|protocol-httpclient|urlfilter-regex|parse-(text|html|msexcel|msword|mspowerpoint|pdf)|index-(basic|more)|query-(basic|more|site|url)|summary-basic|scoring-opic|urlnormalizer-(pass|regex|basic)
</value>
<description>
Regular expression naming plugin directory names to include. Any plugin not matching this expression is excluded. In any case you need at least include the nutch-extensionpoints plugin. By default Nutch includes crawling just HTML and plain text via HTTP, and basic indexing and search plugins. In order to use HTTPS please enable protocol-httpclient, but be aware of possible intermittent problems with the underlying commons-httpclient library.
</description>
</property>
```
## Automation

- Open Text editor and copy the below code into it
```
@cd C:/cygwin64/home/apache-nutch-1.1-bin/
C:\cygwin64\bin\run.exe -p /bin bash runFile.sh
```
- Save the file with the name runFromJava.cmd in any location. The path you choose will be used further. The best practise is to create a new folder cmd lineon your desktop and save the code in that folder.Make sure the extension is .cmd
-	Open a new text document and name itrunFile.sh and copy the below code to it
```
cd C:
cd cygwin64/home/apache-nutch-1.1-bin/
bash crawlBash.sh
```
- Place runFile.shin C:\cygwin64\bindirectoryand make sure the extension is .sh
- Now, create a new text file with the name crawlBash.sh and place it in the C:\cygwin64\home\apache-nutch-1.1-bin directory. 
- Copy the below text and paste it in crawlBash.sh
```
bin/nutch crawl seed.txt -dir web -depth 5 -topN 10
```
- Open Text editor and copy the below code into it
```
@cd C:/cygwin64/home/apache-nutch-1.1-bin/
C:\cygwin64\bin\run.exe -p /bin bash copyBash.sh
```
- Save the file with the name runCopyCmd.cmd in any location. The path you choose will be used further. The best practise is to put it in the cmd line folder on your desktop and save the code in that folder. Make sure the extension is .cmd
-	Now, create a new text file with the name copyBash.sh and place it in the C:\cygwin64\bindirectory. 
Copy the below text and paste it in copyBash.sh
```
cd C:
cd cygwin64/home/apache-nutch-1.1-bin/
bash copySegments.sh
```
- Make sure the extension is .sh
- Now, create a new text file with the name copySegments.sh and place it in the C:\cygwin64\home\apache-nutch-1.1-bin directory. 
- Copy the below text and paste it in copySegments.sh
```
bin/nutchsolrindex http://127.0.0.1:8983/solr/  web/crawldb web/linkdb web/segments/*
```
- Open Text editor and copy the below code into it
```
@cd C:\apache-solr-1.3.0\example
start java -jar start.jar
```
- Save the file with the name startSolr.cmd in any location. The path you choose will be used further. The best practise is to put it in the cmd line folder on your desktop and save the code in that folder.Make sure the extension is .cmd

## Create Maven Project
As JDK, Eclipse, Maven and Tomcat are installed correctly continue with installing M2E. This Eclipse plugin helps us with creating and building Maven projects automatically.

## Creating the Web Service

## Export the web project
Export the web project to local file system and deploy the WAR file in Tomcat

## Build the UI
- Create an ‘index.html’ file that contains script tags to direct to the javascript file ‘index,js’.
-	We have used AJAX to call the web service. AJAX has been implemented using JQuery 

## Export the UI dir to server 
- Export the UI directory to Tomcat and we can observe the Json result obtained from Solr is now accessed and displayed as results on the UI.

## Running the application
- Restart the Tomcat Server by oopening tomcat directory C:\apache-tomcat-8.5.15\bin in cmd prompt and enter startup.bat  and go to the localhost:8181/apache-tomcat-8.5.15/webapps/WebCrawler path in the browser. By default it will direct to WebCrawler/index.html
- When the Search button is clicked the API call will be made to backend and the script files will start executing. 
- Json List displayed on Solr Server
- Search Results page with the keyword highlighted

## Choosing the optimal Depth and Top-N
-	Choosing the optimal Depth and Top-N depends on the number of links the website we are crawling has.
-	The depth parameter essentially tells us how many times should nutch crawl the web page in a single run. This means when you, say for instance, start a nutch crawl job with a value of depth as 3, then the crawl job will repeat 3 times in order to crawl more URLs and fetch maximum number of documents.
-	The topN parameter decides how many pages nutch should crawl per depth. This means, if you estimate a website to have 3000 pages then you can specify a depth value of 3 and a topN value of 1000 for a successful crawl of 3000 documents.
-	However, this is just theoretical and while putting above in practice you might notice that not even 50% of your set target number of URLs have been crawled.  These essentially happen when the URLs timeout or they cant serve content to the spider currently. Choosing optimum values for the above two parameters, depth and topN can be finalised only by trial and error as both of these depend on the size of the website being crawled.

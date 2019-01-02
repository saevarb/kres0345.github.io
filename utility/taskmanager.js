let taskmanager = function (){

    /* Public variables */
    let running_applications = [

    ];

    /* Public methods */

    function start_application(appname) {
        jQuery.get('applications/'+appname+"/"+appname+".html", function (data) {
            var pid = generate_pid();
            document.getElementById("applications").innerHTML += data.replace(/00fff/g, pid);

            //jQuery.getScript('applications/'+appname+"/"+appname+".js");
            var appref = document.getElementsByClassName(appname + "-window");
            var apptopref = document.getElementsByClassName(appname + "-window-top");
            appref[appref.length-1].setAttribute("id", "window-"+pid);
            appref[appref.length-1].setAttribute("data-pid", pid);
            apptopref[apptopref.length-1].setAttribute("id", "window-top-"+pid);
            //appref[appref.length-1].classList.add(pid + "-window");
            //apptopref[apptopref.length-1].classList.add(pid + "-window-top");
            make_draggable(document.getElementById("window-"+pid), document.getElementById("window-top-"+pid));

            if (!document.getElementById(appname+"-css")){
                document.getElementsByTagName("head")[0].innerHTML += `<link rel="stylesheet" type="text/css" id="${appname}-css" href="applications/${appname}/${appname}.css">`
            }
            running_applications.push(pid);
        });
    }

    function kill_application(pid) {
        document.getElementById("window-"+pid).parentElement.removeChild(document.getElementById("window-"+pid));
        running_applications = running_applications.filter(e => e !== pid);
    }

    return {
        //running_applications: running_applications,

        start_application: start_application,
        kill_application: kill_application
    };

    
    /* Private methods */
    function generate_pid() { /* 10*10*6*6*6 */
        do {
            var cur_pid = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
        }
        while (running_applications.includes(cur_pid)){
            cur_pid = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString();
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
            cur_pid += String.fromCharCode(Math.floor(Math.random() * 7) + 97);
        }

        return cur_pid;
    }
}();
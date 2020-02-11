import { windowmanager } from "../windowmanager";
class taskbar {
    static icon_click(element) {
        console.log(element);
        let pid = element.dataset.pid;
        windowmanager.bring_front(pid);
    }
    static update_process() {
        document.getElementById("taskbar-process");
    }
    static add_process(programname, pid) {
        /*
        if (document.getElementsByClassName(`taskbar-icon-${programname}`).length !== 0){

        }*/
        document.getElementById("taskbar-process").innerHTML += `<div class="taskbar-icon taskbar-icon-${programname} taskbar-icon-${pid}" onclick="taskbar.icon_click(this);" data-pid="${pid}">
                <img class="taskbar-icon-image" src="resources/Windows-icons/${programname}.png">
            </div>`;
    }
}

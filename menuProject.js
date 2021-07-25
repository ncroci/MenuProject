class Menu {
    constructor() {
        this.services = [];
        //array for all the different streaming services that the user adds
        this.selectedService = null;
        //when manipulating the services, it uses this empty selected service variable
    }

    showMainMenuOptions() {
        //the main menu
        return prompt(`
        0) Exit
        1) Add Service
        2) View Service
        3) Delete Service
        4) Display Services
        `);
    }

    showServiceMenuOptions(serviceInfo) {
        //the menu for the selected service
        return prompt(`
        0) Back
        1) Add Show
        2) Delete Show

        ${serviceInfo}
        `);
    }
    start() {
        //the choices in the main menu
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.addService();
                    break;
                case '2':
                    this.viewService();
                    break;
                case '3':
                    this.deleteService();
                    break;
                case '4':
                    this.displayServices();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    addService() {
        let name = prompt('Enter name for new Service');
        this.services.push(new Service(name));
    }
    viewService() {
        let index = prompt('Enter index of Service');
        if (index > -1 && index < this.services.length) {
            this.selectedService = this.services[index];
            let description = 'Service: ' + this.selectedService.name + '\n';

            for (let i = 0; i < this.selectedService.shows.length; i++) {
                description += i + ') ' + this.selectedService.shows[i].name + '\n';
            }

            let selection = this.showServiceMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createShow();
                    break;
                case '2':
                    this.deleteShow();
            }
        }
    }
    createShow() {
        let name = prompt('Enter name for new show');
        this.selectedService.shows.push(new Shows(name));
    }
    displayServices() {
        let serviceString = '';
        for (let i = 0; i < this.services.length; i++) {
            serviceString += i + ')' + this.services[i].name + '\n';
        }
        alert(serviceString);
    }
    deleteService() {
        let index = prompt('Enter the index of service you wish to delete:')
        if (index > -1 && index < this.services.length) {
            this.services.splice(index, 1);
        }
    }
    deleteShow() {
        let index = prompt('Enter the index of the show you wish to delete');
        if (index > -1 && index < this.selectedService.shows.length) {
            this.selectedService.shows.splice(index, 1);
        }
    }
}




class Shows {
    constructor(name) {
        this.name = name;
    }
}

class Service {
    constructor(name) {
        this.name = name;
        this.shows = [];
    }

    addShow(show) {
        if (show instanceof Shows) {
            this.shows.push(show);
        } else {
            throw new Error('You can only add an instance of Shows');
        }
    }
}


//what starts the program
let menu = new Menu();
menu.start();
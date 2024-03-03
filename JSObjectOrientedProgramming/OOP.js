// class to structure team
// constructor will allow players to take name and position
class Musician {
    constructor(name, section) {
        this.name = name;
        this.section = section;
    }

    describe() {
        return `${this.name} plays ${this.section}.`; // Correct implementation of describe method
    }
}

class Section {
    constructor(name) {
        this.name = name;
        this.musicians = [];
    }

    addMusician(musician) {
        if (musician instanceof Musician) {
            this.musicians.push(musician);
        } else {
            throw new Error(`You can only add an instance of Musician. Argument is not a musician: ${musician}`);
        }
    }

    describe() {
        return `${this.name} has ${this.musicians.length} musicians.`; // Correct implementation of describe method
    }
}

class Menu {
    constructor() {
        this.sections = [];
        this.selectedSection = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection !== '0') {
            switch (selection) {
                case '1':
                    this.createSection();
                    break;
                case '2':
                    this.viewSection();
                    break;
                case '3':
                    this.deleteSection();
                    break;
                case '4':
                    this.displaySections(); // Fixed method name typo
                    break;
                default:
                    selection = '0';
                    break;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit
        1) Create New Section
        2) View Section
        3) Delete Section
        4) Display All Sections
        `);
    }

    showSectionMenuOptions(sectionInfo) {
        return prompt(`
        0) Back
        1) Create Musician
        2) Delete Musician
        --------------
        ${sectionInfo}
        `);
    }

    displaySections() {
        let sectionString = '';
        for (let i = 0; i < this.sections.length; i++) {
            sectionString += `${i}) ${this.sections[i].name}\n`;
        }
        alert(sectionString); // Fixed loop iteration using this.sections[i].name
    }

    createSection() {
        let name = prompt('Enter name for new section: ');
        this.sections.push(new Section(name));
    }

    viewSection() {
        let index = prompt('Enter the index of the section you wish to view: ');
        if (index > -1 && index < this.sections.length) {
            this.selectedSection = this.sections[index];
            let description = `Section Name: ${this.selectedSection.name}\n`;
            description += `${this.selectedSection.describe()}\n`;

            for (let i = 0; i < this.selectedSection.musicians.length; i++) {
                description += `${i}) ${this.selectedSection.musicians[i].describe()}\n`;
            }

            let selection1 = this.showSectionMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createMusician();
                    break;
                case '2':
                    this.deleteMusician();
                    break;
            }
        }
    }

    deleteSection() {
        let index = prompt('Enter the index of the section you wish to delete: ');
        if (index > -1 && index < this.sections.length) {
            this.sections.splice(index, 1);
            alert('Section deleted successfully.');
        } else {
            alert('Invalid section index.');
        }
    }

    createMusician() {
        let name = prompt('Enter name for new musician: ');
        let section = this.selectedSection.name;
        this.selectedSection.addMusician(new Musician(name, section));
    }

    deleteMusician() {
        let index = prompt('Enter the index of the musician you wish to delete: ');
        if (index > -1 && index < this.selectedSection.musicians.length) {
            this.selectedSection.musicians.splice(index, 1);
            alert('Musician deleted successfully.');
        } else {
            alert('Invalid musician index.');
        }
    }
}

let menu = new Menu();
menu.start();
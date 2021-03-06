import {Component, Output, EventEmitter} from "@angular/core";
import {Sliderpanel} from "../../sliderpanel/Sliderpanel";
import {CommBroker} from "../../../services/CommBroker";
import {NotesBase} from "./NotesBase";
import {DynaFactoryResService} from "./DynaFactoryResService";
import {ListItem, MyReactiveInputEvent} from "../../outputobs/outputobs";
import {Observable} from "rxjs/Observable";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'Notes3',
    providers: [DynaFactoryResService],
    styles: [`
        .colorBlue span {
            color: blue;
        }
    `],
    templateUrl: './Notes3.html'
})

export class Notes3 extends NotesBase {
    constructor(protected sliderPanel: Sliderpanel, protected commBroker: CommBroker, private fb: FormBuilder) {
        super(sliderPanel, commBroker);
        this.me = this;
        this.slideLeft = 'notes4';
        this.slideRight = 'notes2';

        this.contGroup = fb.group({
            'txt': []
        });

    }

    private myInputText: string = '';
    private show = true;
    private wheelDirection = 'wheel me in';
    contGroup: FormGroup;

    @Output() myKeyUp: EventEmitter<any> = new EventEmitter<any>();

    middleware = obs => obs.debounceTime(1000).filter(val => val !== "test");
    middlewareResult = '';

    items: any[] = [
        {title: 'Item 1'},
        {title: 'Item 2'},
        {title: 'Item 3'}
    ];

    myList: ListItem[] = [
        {name: 'foo'},
        {name: 'bar'},
        {name: 'bar2'},
        {name: '2bar'},
        {name: 'test'}
    ]

    search(event: MyReactiveInputEvent) {
        let items = this.myList.filter((e: ListItem) => {
            return new RegExp(event.term, 'gi').test(e.name)
        })
        // pipe the new Observable of filtered items to the observer source we received from the interfaced event
        Observable.from(items).subscribe(event.observer);
    }

    toggleShowHide() {
        this.show = !this.show;
    }

    mouseWheel(direction, event) {
        this.wheelDirection = direction;
    }
}



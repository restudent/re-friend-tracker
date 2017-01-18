import {Injectable} from "@angular/core";
import {TranslationService} from "path-framework/app/path-framework/service/translation.service"

@Injectable()
export class ExampleTranslationService extends TranslationService {

    protected getTranslation(key:string) : string {
        let myTranslations = this.createTranslationMap(this.getExampleTranslations());
        // prefer custom translations
        if (myTranslations.get(key) == null) {
            return super.getTranslation(key);
        }
        return myTranslations.get(key);
    }

    private getExampleTranslations() {
        let languageCode: string = this.getUserLanguage();

        // put additional application translations here
        return {
            "Activities" : "Activities",
            "Birthday" : "Birthday",
            "Comments" : "Comments",
            "Friends" : "Friends",
            "Friend" : "Friend",
            "FamilyName" : "Family Name",
            "FirstName" : "First Name",
            "Groups" : "Groups",
            "Location" : "Location",
            "LocationName" : "Location Name",
            "NewFriend" : "New Friend",
            "NewLocation" : "New Location",
            "Nickname" : "Nickname"
        }
    }

}
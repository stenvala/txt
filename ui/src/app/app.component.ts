import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
  HostListener,
} from "@angular/core";

import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material/sidenav";
import { NavigatorService } from "./navigator.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
  @ViewChild("snavLeft") navLeft: MatSidenav;
  @ViewChild("snavRight") navRight: MatSidenav;

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.check();
  }

  public mobileQueryLeft: MediaQueryList;
  public mobileQueryRight: MediaQueryList;

  private _mobileQueryListenerLeft: () => void;
  private _mobileQueryListenerRight: () => void;

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public nav: NavigatorService
  ) {
    this.mobileQueryLeft = media.matchMedia("(max-width: 727px)");
    this._mobileQueryListenerLeft = () => changeDetectorRef.detectChanges();
    this.mobileQueryLeft.addEventListener(
      "change",
      this._mobileQueryListenerLeft
    );

    this.mobileQueryRight = media.matchMedia("(max-width: 1023px)");
    this._mobileQueryListenerRight = () => changeDetectorRef.detectChanges();
    this.mobileQueryRight.addEventListener(
      "change",
      this._mobileQueryListenerRight
    );
  }

  ngOnDestroy(): void {
    this.mobileQueryLeft.removeEventListener(
      "change",
      this._mobileQueryListenerLeft
    );
    this.mobileQueryRight.removeEventListener(
      "change",
      this._mobileQueryListenerRight
    );
  }

  ngAfterViewInit() {
    setTimeout(this.check.bind(this));
  }

  check(): void {
    if (!this.mobileQueryLeft.matches) {
      this.navLeft.open();
    } else {
      this.navLeft.close();
    }
    if (!this.mobileQueryRight.matches) {
      this.navRight.open();
    } else {
      this.navRight.close();
    }
  }

  toggleLeftNav(): void {
    this.navLeft.toggle();
    if (this.mobileQueryRight.matches) {
      this.navRight.close();
    }
  }

  toggleRightNav(): void {
    this.navRight.toggle();
    if (this.mobileQueryLeft.matches) {
      this.navLeft.close();
    }
  }

  closeLeftNavIfNeeded(): void {
    if (this.mobileQueryLeft.matches) {
      this.navLeft.close();
    }
  }

  closeRightNavIfNeeded(): void {
    if (this.mobileQueryRight.matches) {
      this.navRight.close();
    }
  }

  plus(num: number): void {
    this.nav.movePage(num);
  }

  reload(): void {
    this.nav.reload();
  }
}

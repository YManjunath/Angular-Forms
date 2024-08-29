import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, Subject, catchError, combineLatest, filter, map, observable, of, switchMap } from 'rxjs';

interface UserInterface {
  id: string;
  name: string;
  age: number;
  isActive: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular-forms';

  srcObservable = of(1, 2, 3, 4);
  innerObservable = of('A', 'B', 'C', 'D');

  users$: Observable<UserInterface[]> = of([
    { id: '12', name: 'Dev', age: 27, isActive: true },
    { id: '14', name: 'Max', age: 25, isActive: true },
  ]);

  constructor() {
    const refactorUsers = (
      users$: Observable<UserInterface[]>
    ): Observable<UserInterface[]> => {
      return users$.pipe(
        map((users: any) => 
          // throw new Error('foo')
          users.map((user: any) => user.name)
        
      ),
        catchError((err) => {
          console.log('err', err);
          return of([]);
        })
      );
    };

    refactorUsers(this.users$).subscribe((res) => {
      console.log('refactor*', res);
    });

    // combineLatest
    const foo$ = of('foo');
    const bar$ = of('bar');
    const baz$ = of('baz');

    combineLatest([foo$, bar$, baz$]).subscribe(res => {
      console.log(res);
    });

    // Behaviour subject
    let data$ = new BehaviorSubject<any>([]);
    let gSub$ = new Subject();
    
    setTimeout(()=>{
      data$.next([1,2,3,4,5]);
      gSub$.next(Math.random())
    }, 3000);

    data$.subscribe((res:any) => {
      console.log(res,data$.getValue())
    });

    gSub$.subscribe(res => {
      console.log('subject', res)
    });
    gSub$.subscribe(res => {
      console.log('subject', res)
    });
    gSub$.subscribe(res => {
      console.log('subject', res)
    });

    const observable = new Observable(observer => {
      observer.next(Math.random());
    });

    observable.subscribe(data => console.log(data));
    observable.subscribe(data => console.log(data));

    

  }

  ngOnInit() {
    this.srcObservable
      .pipe(
        switchMap((val: any) => {
          // console.log("source value "+ val)
          // console.log("starting new observable");
          return this.innerObservable;
        })
      )
      .subscribe((res) => {
        // console.log('res', res)
      });

    this.normalizeUsers(this.users$).subscribe((res) => {
      console.log(res);
    });

    this.getUsers(this.users$).subscribe((res1) => {
      console.log('isActive***', res1);
    });
  }

  // RXJS Map
  normalizeUsers(users$: Observable<UserInterface[]>): Observable<string[]> {
    return users$.pipe(
      map((users: any) => users.map((user: any) => user.name))
    );
  }

  // RXJS filter
  getUsers(users$: Observable<UserInterface[]>): Observable<UserInterface[]> {
    return users$.pipe(
      filter((users: any) => users.every((user: any) => user.isActive))
    );
  }
  
}

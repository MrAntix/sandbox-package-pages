import { Component, Prop, h, Build } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'app-package',
  styleUrl: 'app-package.css',
  shadow: true
})
export class AppPackage {
  @Prop() match: MatchResults;

  render() {
    if (!this.match) return;

    const name = [
      this.match.params.namespace,
      this.match.params.name
    ]
      .filter(p => !!p)
      .join('/');

    return (
      <div class="app-package">
        <h2>
          {name}
        </h2>
        <p>this is the package page for {name}</p>

        <p><em>
          this page is {Build.isBrowser ? 'dynamic' : 'Static'}
        </em></p>
      </div >
    );
  }
}

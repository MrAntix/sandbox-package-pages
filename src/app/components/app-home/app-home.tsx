import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  render() {
    return (
      <div class='app-home'>
        <p>Use this form to generate a package page</p>

        <form action="generate" method="get">
          <input name="name" value="@ns/something" autofocus placeholder="@ns/something" autocomplete="off" />
          <button>Generate</button>
        </form>
      </div>
    );
  }
}

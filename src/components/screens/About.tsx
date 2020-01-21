import * as React from "react";

import Card from "../structure/Card";
import logo from "../../img/banner.png";

interface IAboutProps {
  appActions: any;
  history: any;
}

interface IAboutState {
  loading: boolean;
}

export class About extends React.Component<IAboutProps, IAboutState> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false
    };

  }

  public render() {
    return (

      <div id="aboutPage">
        <div className="row justify-content-center">
          <div className="col-6 col-offset-3" style={{ textAlign: "center" }}>
            <img src={logo} alt="Pregxas Logo" style={{ width: "100%" }} />
            <h3>United in Prayer</h3>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 col-offset-3">
            <Card title="" loading={this.state.loading} help="">
              <p>
                <strong>Pregxas</strong> is a young, growing community that strives to be welcoming and open.
                We encourage members of all faith groups to participate. Users can ask for prayer requests,
                  track their requests, track their prayers, and more. <strong>We utilize best practices and modern technologies
                  to provide a clean, efficient, and secure platform.</strong> We are open source, so you can see exactly
                how we handle your information. All of your data is secured to ensure
                that you can feel safe when using our platform.
                </p>
              <p>
                We are currently Ad supported, although donations and app-purchases help to supplement that
                  revenue. <strong>We will not sell your data!</strong>. We also <strong>donate a large share of our
                  profits to various chartiable organizations</strong>. In the future, we will allow the community to
                decide which organizations we will donate to!
                </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

}
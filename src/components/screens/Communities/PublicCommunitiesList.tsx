import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import GenericContainer from "../../structure/GenericContainer";
import Card from "../../structure/Card";
import { CommunitiesAPI } from "../../../api";

import CommunityTile from "./CommunityTile";

interface IPublicCommunitiesListProps {
}

interface IPublicCommunitiesListState {
  loading: boolean;
  sortField: "name" | "created";
  sortDir: "asc" | "desc";
  count: number;
  offset: number;

  communities: any; //TODO: type this
}

class PublicCommunitiesList extends React.Component<IPublicCommunitiesListProps, IPublicCommunitiesListState> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      sortField: "name",
      sortDir: "asc",
      count: 100,
      offset: 0,

      communities: []
    };

    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  public render() {
    return (
      <GenericContainer loading={this.state.loading}>
        {this.state.communities.length === 0 && (
          <Card title="Public Communities" loading={this.state.loading} help="">
            No public communities exist.
          </Card>
        )}

        <div className="row">
          {this.state.communities.map((community: any) => {
            return (
              <div className="col-4" style={{ marginBottom: 20 }} key={community.id}>
                <CommunityTile key={community.id} community={community} />
              </div>
            );
          })}
        </div>
      </GenericContainer>
    );
  }

  private fetch() {
    this.setState({ loading: false }, async () => {
      try {
        const result = await CommunitiesAPI.getPublicCommunities(this.state.sortField, this.state.sortDir, this.state.count, this.state.offset);
        console.log(result);
        this.setState({ loading: false, communities: result.body.data });
      } catch (err) {
        // nothing to do really
        this.setState({ loading: false });
      }
    })
  }
}


const mapStateToProps = function map(s: any) {
  return {
    appState: s.appState
  };
};

function mapDispatchToProps(dispatch: any) {
  return {};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicCommunitiesList) as any);
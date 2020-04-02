import * as React from "react";
import { Link } from "react-router-dom";
import people from "../../../img/open-iconic/people.svg";
import chat from "../../../img/open-iconic/chat.svg";

interface ICommunityTileProps {
  community: any; //TODO: type
}

interface ICommunityTileState {
  loading: boolean;
}

export default class CommunityTile extends React.Component<ICommunityTileProps, ICommunityTileState> {

  constructor(props: ICommunityTileProps){
    super(props);
    this.state = {
      loading: false,
    };

  }

  public render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.community.name}</h5>
          <p className="card-text">{this.props.community.description}</p>
          <div className="row">
            <div className="col-4">
              {this.props.community.memberCount} <img src={people} alt="Members" title="Members" height={14} />
            </div>
            <div className="col-4">
              {this.props.community.requestCount} <img src={chat} alt="Requests" title="Requests" height={14} />
            </div>
            <div className="col-4">
              <Link to={`/communities/${this.props.community.id}`} className="card-link" style={{fontWeight: "bold"}}>Visit</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
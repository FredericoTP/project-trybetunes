import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    musics: [],
    name: '',
    collection: '',
    isLoading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const response = await getMusics(params.id);

    this.setState({
      musics: response,
      name: response[0].artistName,
      collection: response[0].collectionName,
      isLoading: false,
    });
  }

  render() {
    const { musics, name, collection, isLoading } = this.state;
    if (isLoading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ name }</h2>
          <p data-testid="album-name">{ collection }</p>
        </div>
        <div>
          <MusicCard musics={ musics } />
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;

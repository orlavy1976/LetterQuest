import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colors';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.message}>Please restart the app.</Text>
          <Text style={styles.error}>{this.state.error && this.state.error.toString()}</Text>
          <Text style={styles.errorInfo}>{this.state.errorInfo && this.state.errorInfo.componentStack}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.error,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: colors.onBackground,
    textAlign: 'center',
  },
  error: {
    fontSize: 14,
    color: colors.error,
    marginTop: 20,
  },
  errorInfo: {
    fontSize: 12,
    color: colors.onBackground,
    marginTop: 10,
  },
});

export default ErrorBoundary;

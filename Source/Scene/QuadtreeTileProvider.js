/*global define*/
define([
        '../Core/defined',
        '../Core/defineProperties',
        '../Core/DeveloperError'
    ], function(
        defined,
        defineProperties,
        DeveloperError) {
    "use strict";

    /**
     * Provides general quadtree tiles to be displayed on or near the surface of an ellipsoid.  This type describes an
     * interface and is not intended to be instantiated directly.
     *
     * @alias QuadtreeTileProvider
     * @constructor
     *
     * @private
     */
    var QuadtreeTileProvider = function QuadtreeTileProvider() {
        DeveloperError.throwInstantiationError();
    };

    /**
     * Computes the default geometric error for level zero of the quadtree.
     *
     * @memberof QuadtreeTileProvider
     *
     * @param {TilingScheme} tilingScheme The tiling scheme for which to compute the geometric error.
     * @returns {Number} The maximum geometric error at level zero, in meters.
     */
    QuadtreeTileProvider.computeDefaultLevelZeroMaximumGeometricError = function(tilingScheme) {
        return tilingScheme.ellipsoid.maximumRadius * 2 * Math.PI * 0.25 / (65 * tilingScheme.getNumberOfXTilesAtLevel(0));
    };

    defineProperties(QuadtreeTileProvider.prototype, {
        /**
         * Gets or sets the {@link QuadtreePrimitive} for which this provider is
         * providing tiles.
         * @memberof QuadtreeTileProvider.prototype
         * @type {QuadtreePrimitive}
         */
        quadtree : {
            get : DeveloperError.throwInstantiationError,
            set : DeveloperError.throwInstantiationError
        },

        /**
         * Gets a value indicating whether or not the provider is ready for use.
         * @memberof QuadtreeTileProvider.prototype
         * @type {Boolean}
         */
        ready : {
            get : DeveloperError.throwInstantiationError
        },

        /**
         * Gets the tiling scheme used by the provider.  This function should
         * not be called before {@link QuadtreeTileProvider#ready} returns true.
         * @memberof QuadtreeTileProvider.prototype
         * @type {TilingScheme}
         */
        tilingScheme : {
            get : DeveloperError.throwInstantiationError
        },

        /**
         * Gets an event that is raised when the geometry provider encounters an asynchronous error..  By subscribing
         * to the event, you will be notified of the error and can potentially recover from it.  Event listeners
         * are passed an instance of {@link TileProviderError}.
         * @memberof QuadtreeTileProvider.prototype
         * @type {Event}
         */
        errorEvent : {
            get : DeveloperError.throwInstantiationError
        }
    });

    /**
     * Called before any calls to {@link QuadtreeTileProvider#renderTile} in the current render frame.
     * @memberof QuadtreeTileProvider
     * @function
     *
     * @param {Context} context The rendering context.
     * @param {FrameState} frameState The frame state.
     * @param {DrawCommand[]} commandList An array of rendering commands.  This method may push
     *        commands into this array.
     */
    QuadtreeTileProvider.prototype.beginFrame = DeveloperError.throwInstantiationError;

    /**
     * Called after all calls to {@link QuadtreeTileProvider#renderTile} in the current render frame.
     * @memberof QuadtreeTileProvider
     * @function
     *
     * @param {Context} context The rendering context.
     * @param {FrameState} frameState The frame state.
     * @param {DrawCommand[]} commandList An array of rendering commands.  This method may push
     *        commands into this array.
     */
    QuadtreeTileProvider.prototype.endFrame = DeveloperError.throwInstantiationError;

    /**
     * Gets the maximum geometric error allowed in a tile at a given level.  This function should not be
     * called before {@link QuadtreeTileProvider#ready} returns true.
     *
     * @see {QuadtreeTileProvider.computeDefaultLevelZeroMaximumGeometricError}
     *
     * @memberof QuadtreeTileProvider
     * @function
     *
     * @param {Number} level The tile level for which to get the maximum geometric error.
     * @returns {Number} The maximum geometric error.
     */
    QuadtreeTileProvider.prototype.getLevelMaximumGeometricError = DeveloperError.throwInstantiationError;

    /**
     * Loads, or continues loading, a given tile.  This function will continue to be called
     * until {@link QuadtreeTile#state} is no longer {@link QuadtreeTileState#LOADING}.  This function should
     * not be called before {@link QuadtreeTileProvider#ready} returns true.
     *
     * @memberof QuadtreeTileProvider
     * @function
     *
     * @param {Context} context The rendering context.
     * @param {FrameState} frameState The frame state.
     * @param {QuadtreeTile} tile The tile to load.
     *
     * @exception {DeveloperError} <code>loadTile</code> must not be called before the tile provider is ready.
     */
    QuadtreeTileProvider.prototype.loadTile = DeveloperError.throwInstantiationError;

    /**
     * Returns true if the tile is visible.  Tiles that are both visible and renderable will be rendered by a call to
     * {@link QuadtreeTileProvider#renderTile}
     *
     * @memberof QuadtreeTileProvider
     *
     * @param {QuadtreeTile} tile The tile instance.
     * @param {FrameState} frameState The state information about the current frame.
     * @param {QuadtreeOccluders} occluders The objects that may occlude this tile.
     *
     * @returns {Boolean} true if the tile is visible; otherwise, false.
     */
    QuadtreeTileProvider.prototype.isTileVisible = DeveloperError.throwInstantiationError;

    /**
     * Renders a given tile.
     *
     * @memberof QuadtreeTileProvider
     * @function
     *
     * @param {QuadtreeTile} tile The tile instance.
     * @param {Context} context The rendering context.
     * @param {FrameState} frameState The state information of the current rendering frame.
     * @param {DrawCommand[]} commandList The list of rendering commands.  This method may add additional commands to this list.
     */
    QuadtreeTileProvider.prototype.renderTile = DeveloperError.throwInstantiationError;

    /**
     * Gets the distance from the camera to the closest point on the tile.  This is used for level-of-detail selection.
     *
     * @memberof QuadtreeTileProvider
     * @function
     *
     * @param {QuadtreeTile} tile The tile instance.
     * @param {FrameState} frameState The state information of the current rendering frame.
     * @param {Cartesian3} cameraCartesianPosition The position of the camera in world coordinates.
     * @param {Cartographic} cameraCartographicPosition The position of the camera in cartographic / geodetic coordinates.
     *
     * @returns {Number} The distance from the camera to the closest point on the tile, in meters.
     */
    QuadtreeTileProvider.prototype.getDistanceToTile = DeveloperError.throwInstantiationError;

    /**
     * Releases the geometry for a given tile.
     *
     * @memberof QuadtreeTileProvider
     * @function
     *
     * @param {Object} tile The tile instance.
     */
    QuadtreeTileProvider.prototype.releaseTile = DeveloperError.throwInstantiationError;

    /**
     * Returns true if this object was destroyed; otherwise, false.
     * <br /><br />
     * If this object was destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
     *
     * @memberof QuadtreeTileProvider
     *
     * @returns {Boolean} True if this object was destroyed; otherwise, false.
     *
     * @see QuadtreeTileProvider#destroy
     */
    QuadtreeTileProvider.prototype.isDestroyed = DeveloperError.throwInstantiationError;

    /**
     * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
     * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
     * <br /><br />
     * Once an object is destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
     * assign the return value (<code>undefined</code>) to the object as done in the example.
     *
     * @memberof QuadtreeTileProvider
     *
     * @returns {undefined}
     *
     * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
     *
     * @see QuadtreeTileProvider#isDestroyed
     *
     * @example
     * provider = provider && provider();
     */
    QuadtreeTileProvider.prototype.destroy = DeveloperError.throwInstantiationError;

    return QuadtreeTileProvider;
});
